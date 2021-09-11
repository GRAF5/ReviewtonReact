import React from  "react";

export default function useWindowSize() {
    //Серверный рендеринг или клиентский
    const isSSR = typeof window === "undefined";
    //Сохдание состояния с помощь. хука
    const [windowSize, setWindowSize] = React.useState({
        //Если серверный рендеринг устанавливаем стандарнтные значения
        width: isSSR ? 1200 : window.innerWidth,
        height: isSSR ? 800 : window.innerHeight,
    });

    function changeWindowSize() {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight});
    }

    React.useEffect(() => {
        //Создание эвента на событие изменения размера 
        window.addEventListener("resize", changeWindowSize);

        //Удаление события
        return () => {
            window.removeEventListener("resize", changeWindowSize);
        };
    }, []);

    //Возврат размеров окна
    return windowSize;
}