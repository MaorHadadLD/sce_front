import LottieView from "lottie-react-native"
import { FC, useRef } from "react";

const ActivityIndicator: FC<{ visible: boolean }> =
    ({ visible }) => {
        const animation = useRef(null);
        if (!visible) {
            return null
        } else {
            return (
                <LottieView
                    autoPlay
                    loop
                    source={require("../animations/loading.json")} ref={animation}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                ></LottieView>
            )
        }
    }