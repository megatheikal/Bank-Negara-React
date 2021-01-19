import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import web3 from "./web3";
import bankNegara from "./bankNegara";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bank: "",
      balance: "",
      value: "",
      limit: "",
      withdrawvalue: ""
    };
  }

  async componentDidMount() {
    const bank = await bankNegara.methods.bank().call();
    const balance = await bankNegara.methods.getBalance().call();
    const limit = await bankNegara.methods.getLimit().call();
    //const suspect = await bankNegara.methods.infos().call();
    const infoCount = await bankNegara.methods.getInfoCount().call();

    this.setState({ bank, balance, limit });
  }

  onDeposit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    await bankNegara.methods.deposit(web3.utils.toBN(this.state.value)).send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether")
    });
  };

  onWithdraw = async event => {
    try {
      event.preventDefault();

      const accounts = await web3.eth.getAccounts();

      await bankNegara.methods
        .withdraw(this.state.withdrawvalue, accounts[0])
        .sendTransaction({
          from: "0xb9DC008BEa28A56341460E5520D5C4bC2081e0a9",
          value: web3.utils.toWei(this.state.withdrawvalue, "ether")
        });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <h1>Bank Negara Smart Contract</h1>

        <h2>
          The current balance in the bank is{" "}
          {web3.utils.fromWei(this.state.balance, "ether")} ether and the limit
          of any transaction happen in the bank is{" "}
          {web3.utils.fromWei(this.state.limit, "ether")}. The address of this
          smart contract is 0x23EFfF5d0053238d70454296f699350b11532408
        </h2>
        <p>This smart contract been operated by {this.state.bank} </p>
        <hr />
        <form onSubmit={this.onDeposit}>
          <div>
            <label>Amount of ether to deposit</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Deposit !</button>
        </form>
        <hr />
        <form onSubmit={this.onWithdraw}>
          <div>
            <label>Amount of ether to withdraw</label>
            <input
              value={this.state.withdrawvalue}
              onChange={event =>
                this.setState({ withdrawvalue: event.target.value })
              }
            />
          </div>
          <button>Withdraw !</button>
        </form>
      </div>
    );
  }
}

export default App;
