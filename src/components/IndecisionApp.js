import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };
    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));  
    };
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option) //It supposes returning 'false' value, which means we don't want to keep the item in the array
        }));
    };
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({ selectedOption: option }));
    };
    handleSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }));
    }
    handleAddOption = (option) =>{
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        } 
        this.setState((prevState) => ({options: prevState.options.concat(option)}));
    };
    componentDidMount() {
        //Implement the function of reading local data
        //console.log('fetching data');
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if (options) {
                this.setState(() => ({ options }));
            }
        } catch (e) {
            // Do nothing at all
        }
    }
    componentDidUpdate(prevProps, prevState) {
        //Implement the function of storing local data
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
            //console.log('saving data');
        }
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    render() {
        const subtitleIndecision = 'Once you make a decision, the universe conspires to make it happen (R.W.Emerson).'

        return (
            <div>
                <Header subtitle = {subtitleIndecision}/>
                <div className="container">
                    <Action 
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick} 
                    />
                    <div className="widget">
                        <Options 
                            options = {this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption 
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    handleSelectedOption={this.handleSelectedOption}
                />
            </div>
        );
    }
}

export default IndecisionApp;