import { FC, useState } from "react";
import { FlatList, Text, StyleSheet} from "react-native";
import StudentListRow from "./StudentListRow";



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