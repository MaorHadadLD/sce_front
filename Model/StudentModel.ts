type Student = {
    name: string;
    id: string;
    imgUrl: string;
}

const data: Student[] = [
    {name: 'John Doe', id: '123', imgUrl: 'https://via.placeholder.com/150'},
    {name: 'Jane Doe', id: '456', imgUrl: 'https://via.placeholder.com/150' },
    {name: 'John Smith', id: '789', imgUrl: 'https://via.placeholder.com/150'},
]

const getAllStudents = (): Student[] => {
    return data;
}