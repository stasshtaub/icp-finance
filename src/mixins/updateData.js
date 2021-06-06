import { GET_USER } from "@/constants/actions";
import { GET_PAYMENTS } from "@/constants/actions";

export const UpdateData = {
    methods: {
        updateData() {
            this.$store.dispatch(`user/${ GET_USER }`)
            this.$store.dispatch(`paymentsControl/${ GET_PAYMENTS }`)
        }
    }
}
