# Interactive Form - Project #

## Set Form Element ##
    - Line 2 - 20 : I set form elements for using.

## Page Loads ##
    - Line 23 - 41 : When page loads, name field is focused and if "Other" is not selected for job role, the other job role field will be hidden and color field will be disabled and payment method selected credit card. The fields which is related other payments will be hidden.

## Job Role Event ##
    - Line 44 - 47 : Event listener on the job role. If the user selects "Other", the other job role field will be display.

## Design Event ##
    - Line 50 - 78 : Event listener on theme element. When you select any of the theme option, color options which is related with the selected theme option, become selectable and selected first color option the element of theme. If 's' pressed on the keyboard color field is disabled.

## Activities Event ##
    - Line 86 - 127 : Event listener on activities. If you check any of the activities input, the checked input is highlighted and the price is added to the previously defined variable. Other input that are on the same day and date are disabled. If you uncheck any of the checked activities input, the unchecked input is highlighted and the price is removed to the previously defined variable. Other input that are on the same day and date are enabled.

## Payment Event ##
    - Line 130 - 145 : Event listener on payment. Element are hidden or not hidden depending on the payment method selected.

## Success Validator ##
    - Line 148 - 152 : Adds success class and style according to the input

## Failed Validator ##
    - Line 155 - 159 : Adds fail class and style according to the input

## Name Field ##
    - Line 248 : Event listener on input change real time.
    - Line 162 - 171 : If name field is empty, calling the validationFailed function to add related classes or styles. Otherwise, calling the validationSuccessed function to add related classes or styles. Name field is a required field and cannot be blank
    
## Email Field ##
    - Line 250 : Event listener on input change real time.
    - Line 174 - 190 : If email field is empty, calling the validationFailed function to add related classes or styles.Because Email field is a required field and cannot be blank. Else if, must be '@' and '.' sign. A letter after the '.' is required. If these are not followed, calling the validationFailed function to add related classes or styles. Otherwise, calling the validationSuccessed function to add related classes or styles.

       
## Activity Field ##
    - Line 252 : Event listener on change real time.
    - Line 193 - 202 : At least 1 activity must be selected. If not selected, calling the validationFailed function to add related classes or styles. Otherwise, calling the validationSuccessed function to add related classes or styles.

         
## Payment Method Field ##
    - Line 254 : Event listener on card input real time.
    - Line 256 : Event listener on zioCode input real time.
    - Line 258 : Event listener on CVV input real time.
    - All method only if  selected payment method is credit card
    - Line 205 - 206 : Card number is minimum of 13 and maximum of 16 digits. If these regular expressions do not fit, calling the validationFailed function to add related classes or styles. Otherwise, calling the validationSuccessed function to add related classes or styles.
    - Line 219 - 231 : Zip Code must be 5 digits. If these regular expressions do not fit, calling the validationFailed function to add related classes or styles. Otherwise, calling the validationSuccessed function to add related classes or styles.
    - Line 234 - 245 : CVV must be 3 digits. If these regular expressions do not fit, calling the validationFailed function to add related classes or styles. Otherwise, calling the validationSuccessed function to add related classes or styles.

## Form ##
    - Line 260 - 279 : When the register button is clicked, the form submit event listener. Checking validation method. When all the required fields are filled out correctly, the form submits and the page refreshes.
