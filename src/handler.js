// cara import menggunakan require
const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid(16);
  let finished = false;
  if (pageCount === readPage) {
    finished = true;
  }
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const newBooks = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    id,
    finished,
    insertedAt,
    updatedAt,
  };

  // const validation = books.filter((n) => n.id !== id )
  // console.log(validation,'validation');
  if(name === "" ||
  name === 0 ||
  name === undefined ||
  pageCount < readPage){
    console.log('dont push');
  } else{
    books.push(newBooks);
  }

  const isSuccess =
    books.filter(
      (books) =>
        books.id === id &&
        books.name !== "" &&
        books.name !== 0 &&
        books.name !== undefined &&
        pageCount >= readPage
    ).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  } else if (name === "" || name === 0 || name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  } else if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }
};

const getAllBooksHandler = (request, h) => {
  // cara singkat malah ada error ya guys wkwk
/*   const newBooks = books.map(({id, name, publisher}) => {
    return {id, name, publisher}
  }) */
/*   cara dibawah bisa di singkat
  const { reading } = request.query;
  const { finished } = request.query;
  const { name } = request.query; 
  pakai cara di bawah ini*/
  const { reading, finished, name } = request.query;

/*   cara dibawah untuk cara yang awal / panjang, dia menggunakan filter */
  const readingDataT = books.filter((n) => n.reading === true);
  const readingDataF = books.filter((n) => n.reading === false);
  const finishedDataT = books.filter((n) => n.finished === true);
  const finishedDataF = books.filter((n) => n.finished === false); 


// cara di bawah ini untuk cara yang pendek, dia menggunakan find
/* const readingDataT = books.find((n) => n.reading === true);
const readingDataF = books.find((n) => n.reading === false);
const finishedDataT = books.find((n) => n.finished === true);
const finishedDataF = books.find((n) => n.finished === false); */

  /* cara dibawah digunakan untuk menfilter data yang mengandung String dari data yang dkirim di API
  maka data akan dicocok kan pada field name, hanya yang mirip saja */
  const nameData = books.filter((n) => 
  { 
    let booksName = `${n.name}`.toLowerCase(); 
    let booksNameAPI = `${name}`.toLowerCase();
    return booksName.includes(booksNameAPI) 
  });

/* untuk menggunakan cara pendek ini(cara dibawah ini) kita harus map dlu books nya(liat di line 88) */
  /* if (reading === '1') {
    return {
      status: "success",
      data: {
        books: readingDataT,
      },
    };
  } else if(reading === '0'){
    return {
      status: "success",
      data: {
        books: readingDataF,
      },
    };
  }else if(finished === '1'){
    return {
      status: "success",
      data: {
        books: finishedDataT,
      },
    };
  }else if(finished === '0'){
    return {
      status: "success",
      data: {
        books: finishedDataF,
      },
    };
  }
   if(name !== undefined){
    return {
      status: "success",
      data: {
        books: nameData,
      },
    };
  }
  //disiini kita return dan books di isi dengan newsBooks
  return {
    status: "success",
    data: {
      books: newBooks,
    },
  }; */
/*   cara di bawah ini cara awal/ cara panjangnya, pakai yang diatas cara singkatnya */
  if (reading === '1' || reading === 1) {
    let dataTempR = [];
    readingDataT.map((readingLoop) => {
      const id = readingLoop.id;
      const name = readingLoop.name;
      const publisher = readingLoop.publisher;
      const newsReadingLoop = { name, id, publisher };
      dataTempR.push(newsReadingLoop);
    })
    return {
      status: "success",
      data: {
        books: dataTempR,
      },
    };
  } else if (reading === "0" || reading === 0) {
    let dataTempR = [];
    readingDataF.map((readingLoop) => {
      const id = readingLoop.id;
      const name = readingLoop.name;
      const publisher = readingLoop.publisher;
      const newsReadingLoop = { name, id, publisher };
      dataTempR.push(newsReadingLoop);
    })
    return {
      status: "success",
      data: {
        books: dataTempR,
      },
    };
  }else if (finished === '1' || finished === 1) {
    let dataTemp = [];
    finishedDataT.map((finishedLoop) => {
      const id = finishedLoop.id;
      const name = finishedLoop.name;
      const publisher = finishedLoop.publisher;
      const newsFinishedLoop = { name, id, publisher };
      dataTemp.push(newsFinishedLoop);
    })
    return {
      status: "success",
      data: {
        books: dataTemp,
      },
    };
  }else if(finished === 0 || finished === '0') {
    let dataTempF = [];
    finishedDataF.map((finishedLoop) => {
        const id = finishedLoop.id;
        const name = finishedLoop.name;
        const publisher = finishedLoop.publisher;
        const newsFinishedLoop = { name, id, publisher };
        dataTempF.push(newsFinishedLoop);
      })
      return {
        status: "success",
        data: {
          books: dataTempF,
        },
      };
  }
  
  if(name !== undefined){
    let dataTemp = [];
    nameData.map((finishedLoop) => {
      const id = finishedLoop.id;
      const name = finishedLoop.name;
      const publisher = finishedLoop.publisher;
      const newsFinishedLoop = { name, id, publisher };
      dataTemp.push(newsFinishedLoop);
    })
    return {
      status: "success",
      data: {
        books: dataTemp,
      },
    };
  }


  if (books !== [] && reading === undefined && finished === undefined && name === undefined) {
    let dataTemp = [];
    books.map((dataBooks) => {
      const id = dataBooks.id;
      const name = dataBooks.name;
      const publisher = dataBooks.publisher;
      const newsDataBooks = { name, id, publisher };
      dataTemp.push(newsDataBooks);
    });
    return {
      status: "success",
      data: {
        books: dataTemp,
      },
    };
  }else if(finished === undefined && reading === undefined && name === undefined){
    return {
      status: "success",
      data: {
        books,
      },
    };
  }
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);
  const data = books.filter((n) => n.id === id)
  if (index !== -1 && data !== undefined) {
    if (
      name !== undefined &&
      name !== "" &&
      readPage <= pageCount
    ) {
      books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        id,
        updatedAt,
      };
      const response = h.response({
        status: "success",
        message: "Buku berhasil diperbarui",
      });
      response.code(200);
      return response;
    } else if (
      name === undefined ||
      name === "" ||
      name === 0
    ) {
      const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      });
      response.code(400);
      return response;
    } else if (readPage > pageCount) {
      const response = h.response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      });
      response.code(400);
      return response;
    }
  } else if (index === -1) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
