export class PriceSumm {   // Data for Pricing Summary grid (Base case)

    constructor (
        public scenario: string,
        public price: string,
        public value: string,
        public fc_cash_flow: string,
        public fc_principal: string,
        public fc_interest: string,
        public fc_defaults: string,
        public fc_loss: string,
        public fc_recovery: string,
        public fc_pi: string,
        public scenario_id: number)
    {}
}