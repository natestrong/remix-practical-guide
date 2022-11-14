import fs from 'fs/promises';

export async function getStoredNotes() {
    const rawFileContent = await fs.readFile('notes.json', {encoding: 'utf-8'});
    const data = JSON.parse(rawFileContent);
    return data.notes ?? [];
}

export async function storeNotes(notes: any) {
    return fs.writeFile('notes.json', JSON.stringify({notes: notes || []}));
}