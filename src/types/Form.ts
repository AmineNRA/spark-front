import { ChangeEvent } from "react";

export type Form = {
    handleInputChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
}
