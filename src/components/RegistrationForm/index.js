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
    const {firstName, lastName, isSubmittedSuccessful} = this.state
    console.log(firstName, lastName)
    if (firstName === '' && lastName !== '') {
      console.log('first-name')
      this.setState({isFirstBlank: true})
    } else if (firstName !== '' && lastName === '') {
      this.setState({isSecondBlank: true})
    } else if (firstName !== '' && lastName !== '') {
      this.setState(prevState => ({
        isSubmittedSuccessful: !prevState.isSubmittedSuccessful,
        firstName: '',
        lastName: '',
      }))
    } else if (firstName === '' && lastName === '' && !isSubmittedSuccessful) {
      this.setState({
        isFirstBlank: true,
        isSecondBlank: true,
      })
    } else {
      this.setState(prevState => ({
        isSubmittedSuccessful: !prevState.isSubmittedSuccessful,
      }))
    }
  }

  onBlurredFirstName = event => {
    console.log(event.target.value)
    if (event.target.value === '') {
      this.setState({firstName: '', isFirstBlank: true})
      return
    }
    this.setState({firstName: event.target.value, isFirstBlank: false})
  }

  onBlurredLastName = event => {
    if (event.target.value === '') {
      this.setState({lastName: '', isSecondBlank: true})
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
    const {isFirstBlank, isSecondBlank, isSubmittedSuccessful} = this.state
    const addButton = isSubmittedSuccessful
      ? 'Submit Another Response'
      : 'Submit'
    const addFirstBlur = isFirstBlank ? 'blurred' : ''
    const addLastBlur = isSecondBlank ? 'blurred' : ''
    const addBtnClass = isSubmittedSuccessful ? 'add-response' : ''

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
          <div className={`button-card ${addBtnClass}`}>
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
