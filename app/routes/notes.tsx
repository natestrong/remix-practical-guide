import NewNote, {links as newNoteLinks} from "~/components/NewNote";
import NoteList, {links as noteListLinks} from "~/components/NoteList";
import {getStoredNotes, storeNotes} from "~/data/notes";
import {json, redirect} from "@remix-run/node";
import {Link, useCatch, useLoaderData} from "@remix-run/react";

export default function NotesPage() {
    const notes = useLoaderData();

    return <main>
        <NewNote/>
        <NoteList notes={notes}/>
    </main>
}

export async function loader() {
    const notes = await getStoredNotes();
    if (!notes || notes.length === 0) {
        throw json(
            {message: 'Could not find any notes.'},
            {
                status: 404,
                statusText: 'Not Found'
            });
    }
    return notes;
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

export function meta() {
    return {
        title: 'All Notes',
        description: 'Manage your notes here.'
    }
}

export function CatchBoundary() {
    const caughtResponse = useCatch();
    const message = caughtResponse.data?.message || 'Data not found.';

    return <main>
        <NewNote/>
        <p className='info-message'>{message}</p>
    </main>
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
