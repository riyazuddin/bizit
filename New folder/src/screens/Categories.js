import React,{Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    Dimensions,
    Alert,
    FlatList,
    TouchableOpacity,
} from 'react-native';
export default class Categories extends Component{
    state={
        data:[{category1:'Health',category2:'Hotel',category3:'Salon'},
        {category1:'Health',category2:'Hotel',category3:'Salon'}]
    }
    categories(item){
        return(
            <View style={{flexDirection:'column'}}> 
            <View style={{flexDirection:'row',justifyContent:'space-around',margin:10}}>
            <TouchableOpacity>
                <View style={{borderWidth:1,width:150,borderColor:'white',borderRadius:20}}>
                  <Text style={{color:'white',margin:10,alignSelf:'center'}}>{item.category1}</Text>
                </View>
             </TouchableOpacity>
             <TouchableOpacity>   
                <View style={{width:150,borderWidth:1,borderColor:'white',borderRadius:20}}>
                  <Text style={{color:'white',margin:10,alignSelf:'center'}}>{item.category2}</Text>
                </View>
             </TouchableOpacity>
            </View>



            <View style={{flexDirection:'row',justifyContent:'space-around',margin:10}}>
            <TouchableOpacity>
                <View style={{borderWidth:1,width:150,borderColor:'white',borderRadius:20}}>
                  <Text style={{color:'white',margin:10,alignSelf:'center'}}>{item.category3}</Text>
                </View>
             </TouchableOpacity>

             <TouchableOpacity>   
                <View style={{width:150,borderWidth:1,borderColor:'white',borderRadius:20}}>
                  <Text style={{color:'white',margin:10,alignSelf:'center'}}>{item.category2}</Text>
                </View>
             </TouchableOpacity>
            </View>


            <View style={{flexDirection:'row',justifyContent:'space-around',margin:10}}>
            <TouchableOpacity>
                <View style={{borderWidth:1,width:150,borderColor:'white',borderRadius:20}}>
                  <Text style={{color:'white',margin:10,alignSelf:'center'}}>{item.category1}</Text>
                </View>
             </TouchableOpacity>

             <TouchableOpacity>   
                <View style={{width:150,borderWidth:1,borderColor:'white',borderRadius:20}}>
                  <Text style={{color:'white',margin:10,alignSelf:'center'}}>{item.category2}</Text>
                </View>
             </TouchableOpacity>
            </View>


            <View style={{flexDirection:'row',justifyContent:'space-around',margin:10}}>
            <TouchableOpacity>
                <View style={{borderWidth:1,width:150,borderColor:'white',borderRadius:20}}>
                  <Text style={{color:'white',margin:10,alignSelf:'center'}}>{item.category1}</Text>
                </View>
             </TouchableOpacity>

             <TouchableOpacity>   
                <View style={{width:150,borderWidth:1,borderColor:'white',borderRadius:20}}>
                  <Text style={{color:'white',margin:10,alignSelf:'center'}}>{item.category2}</Text>
                </View>
             </TouchableOpacity>
            </View>


            <View style={{flexDirection:'row',justifyContent:'space-around',margin:10}}>
            <TouchableOpacity>
                <View style={{borderWidth:1,width:150,borderColor:'white',borderRadius:20}}>
                  <Text style={{color:'white',margin:10,alignSelf:'center'}}>{item.category1}</Text>
                </View>
             </TouchableOpacity>

             <TouchableOpacity>   
                <View style={{width:150,borderWidth:1,borderColor:'white',borderRadius:20}}>
                  <Text style={{color:'white',margin:10,alignSelf:'center'}}>{item.category2}</Text>
                </View>
             </TouchableOpacity>
            </View>
         </View>  
        )
    }
    render(){
        return(
            <ScrollView style={{backgroundColor:'black'}}>
               <View style={{justifyContent:'center',alignItems:'center',margin:20}}>
                <TouchableOpacity>
                   <Image style={{height:30,width:30,margin:10}} source={require('../images/Close_Image.png')}/>
                </TouchableOpacity>
                   <Text style={{color:'white',fontSize:14,margin:15}}>ALL CATEGORIES</Text>
               </View>

               <FlatList
                    vertical={true}
                    data={this.state.data}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) =>this.categories(item)}    
                    />

            </ScrollView>
        );
    }
}