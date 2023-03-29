// cara import menggunakan require
const { nanoid } = require('nanoid');
const notes = require('./notes')

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    // code dibawah digunakan agar variable diisi secara auto
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNotes = {
        title, tags, body, id, createdAt, updatedAt
    };

    notes.push(newNotes);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan Berhasil di Tambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan Gagal Ditambahkan'
    });
    response.code(500);
    return response;
}

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    }
})

const getNoteByIdHandler = (request, h) => {
 const { id } = request.params;

 const note = notes.filter((n) => n.id === id)[0];

 if(note !== undefined){
    return {
        status: 'success',
        data: {
            note,
        }
    }
 }
 const response = h.response({
    status: 'fail',
    message: 'catatan tidak ditemukan'
 });
 response.code(404);
 return response;
};

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if(index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        }
        const response = h.response({
            status: 'success',
            message: 'catatan berhasil diperbaharui',
        });
        response.code(201);
        return response;
    };
    
    const response = h.response({
        status: 'fail',
        message: 'catatan gagal diperbaharui, id tidak ditemukan',
    });
    response.code(500);
    return response
};

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);
    if(index !== -1){
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'catatan berhasil dihapus',
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan Gagal dihapus, Id Tidak ditemukan'
    });
    response.code(500);
    return response;
};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler }