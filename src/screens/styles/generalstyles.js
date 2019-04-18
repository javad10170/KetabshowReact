import {StyleSheet,Platform} from 'react-native';
import colors from './theme';

export default gstyles = StyleSheet.create({
    profileTitleText: {
        flex: 1,
        textAlign: "center",
        height: 20,
        flexGrow: 0.3
    },
    profileInfoText: {
        flex: 1,
        fontWeight: "bold",
        fontSize: 20,
        color: "black",
        textAlign: "center",
        height: 25,
        flexGrow: 0.3
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'rgba(0,0,0,0.75)'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },

    headerText:{
        color:colors.headerTextColor,
        fontSize:17,
        fontWeight:"bold"
    },
    textbox: {
        color:"white",
        textAlign:"center",
        borderColor:"white",
        borderWidth:1,
        borderRadius:8,
        marginTop:10,
        width:300,
        backgroundColor:"rgba(255,255,255,0.25)",
        
        ...Platform.select({
            ios:{
                
            },
            android:{
                height:50,
            }
        })
    },
    calbox:{
        textAlign:"center",
        borderColor:"#e5e5e5",
        borderWidth:1,
        borderRadius:8,
        marginTop:10
    },
    bigbutton:{ 
        marginTop: 20,
        borderRadius: 8,
        width: 300 
    },
    dropdown:{
        width:200,
        borderColor:"#e5e5e5",
        borderWidth:1,
        borderRadius:8,
        marginTop:10,
        padding:0
    }
    
});
