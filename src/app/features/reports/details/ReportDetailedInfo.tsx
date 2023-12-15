import { Button, Grid, Icon, Segment, Modal, Form, Image } from "semantic-ui-react";
import { AppReport } from "../../../types/report";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Props = {
  report: AppReport;
};

export default function ReportDetailedInfo({ report }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleShowMapClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleImageSubmit = (formData: FormData) => {
    try {
      const imageFile = formData.get("image") as File;
      if (!imageFile) {
        throw new Error("No image selected");
      }

      // Create a local URL for the selected image without uploading it
      const localURL = URL.createObjectURL(imageFile);
      setImageURL(localURL);

      // Navigate to the "Resultphoto" file or route
      navigate("/Resultphoto");

      handleModalClose();
    } catch (error) {
      console.error("Error submitting image:", error.message);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{report.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{report.place}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button color="teal" size="tiny" content="Show Map" onClick={handleShowMapClick} />
          </Grid.Column>
        </Grid>
      </Segment>

      {/* Display the submitted photo if available */}
      {imageURL && (
        <Segment attached>
          <Image src={imageURL} alt="Submitted" />
        </Segment>
      )}

      {/* Modal for Image Input */}
      <Modal open={modalOpen} onClose={handleModalClose} size="tiny">
        <Modal.Header>Upload Image</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Choose Image</label>
              <input type="file" name="image" accept="image/*" />
            </Form.Field>
            <Button
              type="button"
              color="teal"
              onClick={() => handleImageSubmit(new FormData())}
            >
              Submit
            </Button>
            <Button type="button" onClick={handleModalClose}>
              Cancel
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </Segment.Group>
  );
}
