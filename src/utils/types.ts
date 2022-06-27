import { MouseEventHandler } from "react";


export interface EventProps extends React.ChangeEvent<HTMLInputElement> {}
export interface EventProps extends MouseEventHandler<HTMLButtonElement> {}