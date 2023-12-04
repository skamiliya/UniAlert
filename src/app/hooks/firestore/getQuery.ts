import { Query, collection, query, where, orderBy } from "firebase/firestore";
import { CollectionOptions } from "./type"; // Assuming OptionTypes is exported from "./type"
import { db } from "../../config/firebase";

export const getQuery = (path: string, options: CollectionOptions): Query => {
    let q = collection(db, path) as Query;

    if (options && options.queries) {
        options.queries.forEach(({ attribute, operator, value }) => {
            q = query(q, where(attribute, operator, value));
        });
    }

    if (options && options.sort) {
        const { attribute, order } = options.sort;
        q = query(q, orderBy(attribute, order));
    }

    return q;
};
