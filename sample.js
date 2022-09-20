proposalList: { } - State
getProposalList: (state) => state.proposalList - getters

fetchProposalDetails({commit}, params) {
    const response = await api.get(apiURL + 'customer', {
      params
    })
    commit('setProposalDetails', response.data)
  },
--actions

setProposalDetails: (state, proposal) => {
    state.proposalList = proposal
  },
-mutaion (edited) 

...mapActions("clearvueProposal", [
      "fetchProposalDetails"]) - Inside vue file methods
...mapGetters("clearvueProposal", [
      "getProposalList"]) - Inside vue file computed

getCustomerList() {
    this.startOffset = this.pageNumber - 1;
    const params = {
        offset: this.startOffset + 1,
        limit: this.itemsPerPage,
        orderby: this.sortField ? this.sortField : "updated_at",
        orderbyValue: this.sortDirection,
        searchValue: this.searchValue ? this.searchValue : "",
    };
    this.spinner = true;
    this.fetchProposalDetails(params)
    .then(() => {
        this.customerData = this.getProposalList.result;
        this.customerData.map((val) => {
            val.updatedAt = moment(val.updatedAt).format("YYYY-MM-DD HH:mm:ss");
            return val;
        });
        this.totalRecordCount = Number(this.getProposalList.totalRecords);
        this.endShowingValue = this.startOffset * this.itemsPerPage + this.customerData.length;
        if (this.customerData && this.customerData.length !== 0) {
            this.showNoRecord = false;
        } else {
            this.showNoRecord = true;
        }
        this.spinner = false;
    })
    .catch((err) => {
        console.log(err, "err");
    });
},
