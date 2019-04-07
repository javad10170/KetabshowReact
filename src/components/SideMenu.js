import PropTypes from 'prop-types';
import React, { Component } from 'react';
//import styles from './SideMenu.style';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native'
import { Divider, Icon } from "react-native-elements";
import colors from '../screens/styles/theme';

class SideMenu extends Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }
    render() {
        return (
            <View style={{ backgroundColor: "white", flex: 1 }}>
                <ScrollView contentContainerStyle={{paddingTop:30}}>
                    <View>
                        <View style={styles.menuItem}>
                            <Icon name="person" type="FontAwesome" size={30} color={colors.AppViolet} />
                            <Text style={styles.menuText}>
                                Profile
                        </Text>
                        </View>
                        <Divider style={{ backgroundColor:colors.AppViolet}} />
                        <View style={styles.menuItem}>
                            <Icon name="domain" type="FontAwesome" size={30} color={colors.AppViolet} />
                            {/* <Text onPress={this.navigateToScreen('Dashboard')} style={}> */}
                            <Text style={styles.menuText}>
                                About us
                            </Text>
                        </View>
                        <Divider style={{ backgroundColor: colors.AppViolet }} />
                        <View style={styles.menuItem}>
                            <Icon name="widgets" type="FontAwesome" size={30} color={colors.AppViolet} />
                            <Text style={styles.menuText}>
                                Contact us
                        </Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: colors.AppViolet }} >
                    <Text style={{ color: "white", textAlign: "center", padding: 10 }}>Ketap</Text>
                </View>
            </View>
        );
    }
}
SideMenu.propTypes = {
    navigation: PropTypes.object
};

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: "row",
        padding:5,
        alignItems:"center"
    },

    menuText:{
        fontSize:17,
        paddingLeft:10
    }

});
export default SideMenu;