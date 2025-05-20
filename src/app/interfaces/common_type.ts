export type I_CarData = {
    id: number;
    name: string;
    price: string;
    imageUrl: string;
    imageGroup: string[];
    specs: {
        year: number;
        transmission: string;
    }[];
    info: {
        title: string;
        special: string[];
    }[];
};
