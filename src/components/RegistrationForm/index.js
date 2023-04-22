import {Component} from 'react'

import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    isFirstBlank: false,
    isSecondBlank: false,
    isSubmittedSuccessful: false,
  }

  onSubmitted = event => {
    event.preventDefault()
    const {firstName, lastName} = this.state

    if (firstName === '' && lastName !== '') {
      this.setState(prevState => ({isFirstBlank: !prevState.isFirstBlank}))
    } else if (firstName !== '' && lastName === '') {
      this.setState(prevState => ({isSecondBlank: !prevState.isSecondBlank}))
    } else if (firstName !== '' && lastName !== '') {
      this.setState(prevState => ({
        isSubmittedSuccessful: !prevState.isSubmittedSuccessful,
      }))
    } else {
      this.setState(prevState => ({
        isFirstBlank: !prevState.isFirstBlank,
        isSecondBlank: !prevState.isSecondBlank,
      }))
    }
  }

  onBlurredFirstName = event => {
    if (event.target.value === '') {
      this.setState(prevState => ({isFirstBlank: !prevState.isFirstBlank}))
      return
    }
    this.setState({firstName: event.target.value, isFirstBlank: false})
  }

  onBlurredLastName = event => {
    if (event.target.value === '') {
      this.setState(prevState => ({isSecondBlank: !prevState.isSecondBlank}))
      return
    }
    this.setState({lastName: event.target.value, isSecondBlank: false})
  }

  addSuccess = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        className="success-icon"
        alt="success"
      />
      <p className="success-para">Submitted Successfully</p>
    </>
  )

  addRequired = () => <p className="required">Required</p>

  addForm = (isFirstBlank, isSecondBlank, addFirstBlur, addLastBlur) => (
    <>
      <label htmlFor="first" className="first-name">
        FIRST NAME
      </label>
      <input
        placeholder="First name"
        type="text"
        id="first"
        className={`first-name-input ${addFirstBlur}`}
        onBlur={this.onBlurredFirstName}
      />
      {isFirstBlank ? this.addRequired() : ''}
      <label htmlFor="last" className="last-name">
        LAST NAME
      </label>
      <input
        placeholder="Last name"
        type="text"
        id="last"
        className={`last-name-input ${addLastBlur}`}
        onBlur={this.onBlurredLastName}
      />
      {isSecondBlank ? this.addRequired() : ''}
    </>
  )

  render() {
    const {
      lastName,
      isFirstBlank,
      isSecondBlank,
      isSubmittedSuccessful,
    } = this.state
    const addButton = isSubmittedSuccessful
      ? 'Submit Another Response'
      : 'Submit'
    const addFirstBlur = isFirstBlank ? 'blurred' : ''
    const addLastBlur = isSecondBlank ? 'blurred' : ''
    console.log(lastName)

    return (
      <div className="bg-container">
        <h1 className="registration-heading">Registration</h1>
        <form className="form-el" onSubmit={this.onSubmitted}>
          {isSubmittedSuccessful
            ? this.addSuccess()
            : this.addForm(
                isFirstBlank,
                isSecondBlank,
                addFirstBlur,
                addLastBlur,
              )}
          <div className="button-card">
            <button type="submit" className="button">
              {addButton}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default RegistrationForm
