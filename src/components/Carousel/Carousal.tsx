import * as React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { CarouselRenderItem, ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { useTheme } from "../../theme/ThemeProvider";

const { width: screenWidth } = Dimensions.get("window");

console.log("This is width ===>", screenWidth)

interface IItem {
    id: number,
    image: any,
}

interface props {
    data: IItem[],
    showPagination?: boolean,
    loop?: boolean,
    mode?: 'horizontal-stack' | 'vertical-stack' | 'parallax',
    renderItem: CarouselRenderItem<IItem>,
    showDots?: boolean
    autoPlay?: boolean
    autoPlayInterval?: number
}

function Carousal({ data, showPagination = true, loop, mode = 'parallax', renderItem, showDots = false, autoPlay = false, autoPlayInterval = 1000 }: props) {
    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);
    const { colors } = useTheme();

    const carouselHeight = screenWidth / 2;

    return (
        <View style={styles.container}>
            <Carousel
                ref={ref}
                width={screenWidth}
                height={carouselHeight}
                data={data}
                loop={loop}
                mode={mode}
                pagingEnabled={showPagination}
                modeConfig={{
                    parallaxScrollingScale: 0.80, // side items same height
                    parallaxScrollingOffset: 95,
                }}
                onProgressChange={(_, absoluteProgress) => {
                    progress.value = absoluteProgress;
                }}
                renderItem={renderItem}
                autoPlay={autoPlay}
                autoPlayInterval={autoPlayInterval}
            />
            {showDots && (
                <Pagination.Basic
                    progress={progress}
                    data={data}
                    dotStyle={{ backgroundColor: colors.contentQuinary, width: 8, height: 8, borderRadius: 50 }}
                    activeDotStyle={{ backgroundColor: colors.primary }}
                    containerStyle={{ marginTop: 38, gap: 6 }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        borderRadius: 12,
        overflow: "hidden",
    },
    image: {
        flex: 1,         // 👈 fills parent
        width: "100%",
        height: "100%",
        resizeMode: "cover", // maintains aspect ratio, crops excess,
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        backgroundColor: "rgba(0,0,0,0.4)",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 6,
        position: "absolute",
        bottom: 10,
    },
});

export default Carousal;
