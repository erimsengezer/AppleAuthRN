import appleAuth, {
    AppleButton,
    AppleAuthRequestOperation,
    AppleAuthRequestScope,
    AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';

import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';

async function onAppleButtonPress() {

    const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
        Alert.alert(
            "Success",
            "User: " + appleAuthRequestResponse[0],
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }
}

function App() {
    return (
        <View style={styles.container}>
            <AppleButton
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.SIGN_IN}
                style={{
                    width: 160,
                    height: 45,
                }}
                onPress={() => onAppleButtonPress()}
            />
        </View>
    );
}

const styles = StyleSheet.create({

   container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
   }

});


export default App;
