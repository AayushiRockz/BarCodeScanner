import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Image, CameraRoll} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{

    constructor(){
    super();
    this.state = {
        hasCameraPermissions:null,
        scanned:false,
        scannedData:'',
        buttonState:'normal'

         }
    }

    getCameraPermissions=async()=>{
        const {status} =await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status==='granted',
            buttonState:'clicked',
            scanned:false

        })
    }

    handleBarCodeScanned=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'

        })
    }

    
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        
        if(buttonState==='clicked' && hasCameraPermissions){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}/>
            );
        }
        else if(buttonState==='normal')
        return(
            <View style={styles.container}>
                <Text style={styles.headingText}>Bar Code Scanner</Text>
                <Image style={{width:350,height:350}}
                source={require('../assets/camera.jpg')}
                />
                <Text style={styles.displayText}>{hasCameraPermissions===true ?this.state.scannedData:"request Camera Permissions"}</Text>

                <TouchableOpacity onPress={this.getCameraPermissions} style={styles.scanButton}>
                    <Text style={styles.buttonText}>Click to Scan</Text>
                </TouchableOpacity>
            </View>
        ); 

    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    displayText:{fontSize:20,fontWeight:"bold",textDecorationLine:'underline'},
    scanButton:{backgroundColor:"hotpink",padding:10,margin:10},
    buttonText:{fontSize:20},
    headingText:{fontSize:100,color:'blue'}
})
