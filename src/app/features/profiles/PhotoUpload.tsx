import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import { useState } from 'react';
import { useFirestore } from '../../hooks/firestore/useFirestore';
import { auth, storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Profile } from '../../types/profile';
import { updateProfile } from 'firebase/auth';
import { createId } from '@paralleldrive/cuid2';

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginImageTransform)

type Props = {
    profile: Profile
    setEditMode: (value: boolean) => void
}

export default function PhotoUpload({profile, setEditMode}: Props) {
    const [files, setFiles] = useState<any>([]);
    const {update} = useFirestore('profiles');
    const {set} = useFirestore(`profiles/${auth.currentUser?.uid}/photos`);

    return (
        <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={false}
            maxFiles={1}
            server={{
                process: (_fieldName, file, _metadata, load, error, progress) => {
                    const id = createId();
                    const storageRef = ref(storage, `${auth.currentUser?.uid}/user_images/${id}`);
                    const task = uploadBytesResumable(storageRef, file);

                    task.on(
                        'state_changed',
                        snap => {
                            progress(true, snap.bytesTransferred, snap.totalBytes)
                        },
                        err => {
                            error(err.message)
                        },
                        () => {
                            getDownloadURL(task.snapshot.ref).then(async (url) => {
                                if (!profile.photoURL) {
                                    await update(profile.id, {
                                        photoURL: url
                                    });
                                    await updateProfile(auth.currentUser!, {
                                        photoURL: url
                                    })
                                }
                                await set(id, {
                                    name: file.name,
                                    url
                                })
                                setEditMode(false);
                            })
                            load(id);
                        }
                    )
                }
            }}
            name="files"
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            credits={false}
            allowImageCrop={true}
            imageCropAspectRatio='1:1'
            instantUpload={false}
        />
    )
}