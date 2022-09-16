export interface GameParms{
    id: string;
    title: string;
    bannerURL: string;
}


export declare global {
    namespace ReactNavigation{
        interface RootParamList{
            home: undefined;
            game: GameParms;
        }
    }
}
