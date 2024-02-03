import moment from "moment";
export const DateFormat = (value: any) => {
    return moment(value).format("DD-MMM-YYYY")
}