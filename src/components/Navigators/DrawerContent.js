import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {Avatar, Caption, Drawer, Switch, Text, Title, TouchableRipple} from 'react-native-paper'
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {signOut} from "../../../store/Actions/AuthActions";
import {connect} from "react-redux";

function DrawerContent(props) {
    const [isDarkTheme, setIsDarkTheme] = useState(false)

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme)
    }

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15,}}>
                            <Avatar.Icon icon="camera" size={50}/>
                            <View style={{marginLeft: 15, flexDirection: 'column',}}>
                                <Title style={styles.title}> {props.auth.user.FirstName + " " + props.auth.user.LastName} </Title>
                                <Caption style={styles.caption}> ecoders </Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={() => (
                                <Icon
                                    name='view-dashboard-outline'
                                    color='black'
                                    size={20}
                                />
                            )}
                            label="Dashboard"
                            onPress={() => {
                                props.navigation.navigate('Dashboard')
                            }}
                        />
                        <DrawerItem
                            icon={() => (
                                <Icon
                                    name='bell-outline'
                                    color='black'
                                    size={20}
                                />
                            )}
                            label="Notifications"
                            onPress={() => {
                                props.navigation.navigate('Notifications')
                            }}
                        />
                        <DrawerItem
                            icon={() => (
                                <Icon
                                    name='camera-outline'
                                    color='black'
                                    size={20}
                                />
                            )}
                            label="Plant Finder"
                            onPress={() => {
                                props.navigation.navigate('FindPlant')
                            }}
                        />
                        <DrawerItem
                            icon={() => (
                                <Icon
                                    name='layers-outline'
                                    color='black'
                                    size={20}
                                />
                            )}
                            label="Plant Database"
                            onPress={() => {
                                props.navigation.navigate('PlantDatabase')
                            }}
                        />
                        <DrawerItem
                            icon={() => (
                                <Icon
                                    name='gamepad-round-outline'
                                    color='black'
                                    size={20}
                                />
                            )}
                            label="Game"
                            onPress={() => {
                                props.navigation.navigate('Game')
                            }}
                        />
                        <DrawerItem
                            icon={() => (
                                <Icon
                                    name='settings-outline'
                                    color='black'
                                    size={20}
                                />
                            )}
                            label="Settings"
                            onPress={() => {
                                props.navigation.navigate('Settings')
                            }}
                        />
                    </Drawer.Section>

                    {/*<Drawer.Section title="Preferences">*/}
                    {/*    <TouchableRipple onPress={() => {*/}
                    {/*        toggleTheme()*/}
                    {/*    }}>*/}
                    {/*        <View style={styles.preference}>*/}
                    {/*            <Text> Dark Theme </Text>*/}
                    {/*            <View pointerEvents="none">*/}
                    {/*                <Switch value={isDarkTheme}/>*/}
                    {/*            </View>*/}
                    {/*        </View>*/}
                    {/*    </TouchableRipple>*/}
                    {/*</Drawer.Section>*/}

                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={() => (
                        <Icon
                            name='exit-to-app'
                            color='black'
                            size={20}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {
                        props.signOut()
                    }}
                />
            </Drawer.Section>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 25,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 20,
        lineHeight: 20,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: '15',
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },

})
