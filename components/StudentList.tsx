import { FC, useState } from "react";
import { FlatList, Text, StyleSheet} from "react-native";
import StudentListRow from "./StudentListRow";

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

const StudentList: FC = () => {
    return (
       <FlatList 
       style={styles.flatlist}
       data={data}
       keyExtractor={(item) => item.id}
       renderItem={({item}) => 
       <StudentListRow 
       name={item.name} 
       id={item.id} 
       imagUrl={item.imgUrl}/>
         }
       />
    );
}

const styles = StyleSheet.create({
    
    flatlist: {
      flex: 1,
    },
});
export default StudentList;