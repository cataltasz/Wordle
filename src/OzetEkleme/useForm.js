import { useState } from "react"

export const useBookForm = (ISBN) => {
    const [isbn, setIsbn] = useState(ISBN);
    const [bookName, setBookName] = useState();

    const [categories, setCategories] = useState([]);

    let form = {
        isbn: {type: "num", state: useState(ISBN)},
        bookName: {type: "str", state: useState("")},
        categories: {type: "arr", state: useState([])},
    }

    return form
}

export const useAuthorForm = (id) => {
    let form = {
        authorName: {type: "str", state: useState("")},
        authorApiId:  {type: "str", state: useState(id)},
        categories:  {type: "arr", state: useState([])},
    }

    return form
}