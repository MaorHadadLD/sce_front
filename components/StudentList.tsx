import { FC, useEffect, useState } from "react";
import { FlatList, Text, StyleSheet} from "react-native";
import StudentListRow from "./StudentListRow";
import StudentModel, {Student} from "../Model/StudentModel";

const StudentList: FC = () => {

  const [data, setData] = useState<Student[]>([])
    useEffect(() => {
      setData(StudentModel.getAllStudents());
    }, [])
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