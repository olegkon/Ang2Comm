export class PriceSummNonBase {   // Data for non-base Pricing Summary grid and 6 graphs

    constructor (
        public fc_balance: string,
        public fc_cash_flow: string,
        public fc_principal: string,
        public fc_interest: string,
        public fc_defaults: string,
        public fc_loss: string,
        public fc_recovery: string,
        public label: string,
        public interval_type: string)
    {}
}