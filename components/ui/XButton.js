import { Pressable } from "react-native";
import XButtonIcon from "../../assets/XIcon";

function XButton({onPress}) {
   return(
        <Pressable
            onPress={onPress}>
            <XButtonIcon style={{fontSize: 32, marginBottom: 10}}/>
        </Pressable>
   ) 
}

export default XButton;