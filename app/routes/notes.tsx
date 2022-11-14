import NewNote, {links as newNoteLinks} from "~/components/NewNote";
import NoteList, {links as noteListLinks} from "~/components/NoteList";
import {getStoredNotes, storeNotes} from "~/data/notes";
import {redirect} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";

export default function NotesPage() {
    const notes = useLoaderData();

    return <main>
        <NewNote/>
        <NoteList notes={notes}/>
    </main>
}

export async function loader() {
    return await getStoredNotes();
}

export async function action(data: any) {
    const formData = await data.request.formData();
    const noteData = {
        title: formData.get("title").trim(),
        content: formData.get("content"),
        id: new Date().toISOString()
    }

    if (noteData.title.length < 5) {
        return {message: 'Invalid title - must be at least 5 characters long.'}
    }

    const existingNotes = await getStoredNotes();
    const updatedNotes = [...existingNotes, noteData];
    await storeNotes(updatedNotes);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return redirect('/notes');
}

export function links() {
    return [
        ...newNoteLinks(),
        ...noteListLinks(),
    ];
}

export function ErrorBoundary({error}: { error: Error }) {
    return (
        <main className="error">
            <h1>Error with notes 🙃</h1>
            <p>{error.message}</p>
            <p>Back to <Link to="/">safety</Link>!</p>
        </main>
    );
}
