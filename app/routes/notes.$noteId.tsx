import {Link, useLoaderData} from "@remix-run/react";
import styles from "~/styles/note-details.css";
import {getStoredNotes} from "~/data/notes";
import {json} from "@remix-run/node";

export default function NoteDetailsPage() {
    const note = useLoaderData();

    return <main id="note-details">
        <header>
            <nav>
                <Link to="/notes">Back to all Notes</Link>
            </nav>
            <h1>{note.title}</h1>
        </header>
        <p id="note-details">{note.content}</p>
    </main>
}

export async function loader({params}) {
    const notes = await getStoredNotes();
    const noteId = params.noteId;
    const note = notes.find(note => note.id === noteId);

    if (!note) {
        throw json(
            {message: `Note with id ${noteId} not found`},
            {status: 404}
        );
    }
    return note;
}

export function links() {
    return [{rel: "stylesheet", href: styles}];
}

export function meta({data}) {
    return {
        title: data.title,
        description: 'View note details here.'
    }
}