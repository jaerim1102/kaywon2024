const books = document.querySelectorAll('.book');

books.forEach(book => {
      book.addEventListener('click', function () {
            book.classList.toggle('flipped');
      });
});

document.addEventListener('DOMContentLoaded', function () {
      const bookLists = document.querySelectorAll('.book-list');

      bookLists.forEach(bookList => {
            bookList.addEventListener('wheel', function (e) {
                  if (e.deltaY !== 0) {
                        e.preventDefault();
                        bookList.scrollLeft += e.deltaY;
                  }
            });
      });

      const books = document.querySelectorAll('.book');

      books.forEach(book => {
            book.addEventListener('click', function () {
                  book.classList.toggle('flipped');
            });
      });
});
