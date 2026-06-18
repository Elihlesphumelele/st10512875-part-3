# st10512875-part-3PART 3 JavaScript 

This JavaScript file for APEX PROTECT is responsible for improving user experience through three main features: automatic navigation highlighting, detailed contact form validation, and toast-style notifications that give feedback to the user. It runs once the page has fully loaded using a DOMContentLoaded event listener, which ensures all HTML elements are available before the script tries to interact with them. 

The first feature automatically highlights the active navigation link. The script determines the current page by reading the URL using window.location.pathname and extracting the filename (for example, index.html or contact.html). It then loops through all navigation links inside the .navbar using querySelectorAll('.navbar a'). For each link, it removes any existing “active” class to reset the state. It then compares the link’s href value (also reduced to just the filename) with the current page. When a match is found, the script adds the active class to that link. This makes the navigation menu automatically reflect the page the user is currently viewing, improving usability and eliminating the need to manually set active states in each HTML file. 

The second and most complex feature is the contact form validation system. The script first selects the form using .contact-form. If the form does not exist on the page, it stops running (return), which prevents errors on pages that do not contain the form. It then defines three helper functions to manage form states. The setError() function marks a field as invalid by adding an input-error class and removing input-success. It also creates or updates a small <span> element under the input to display a specific error message such as “Email is required” or “Message must be at least 10 characters.” The setSuccess() function does the opposite: it removes error styling, adds a success class, and hides any error message. The clearState() function resets the field completely by removing both success and error styles when the user starts typing again. 

After setting up helpers, the script defines three validation functions: validateName, validateEmail, and validateMessage. The name validation ensures the field is not empty, is at least 2 characters long, and contains only valid characters (letters, spaces, hyphens, and apostrophes) using a regular expression. The email validation checks that the field is not empty and matches a standard email pattern using a regex like /^[^\s@]+@[^\s@]+\.[^\s@]+$/. The message validation ensures the user has typed something meaningful by requiring at least 10 characters. Each function either calls setError() with a custom message or setSuccess() if the input is valid, and returns true or false accordingly. 

The script then connects these validations to user interactions. It adds blur event listeners so that when the user leaves a field, it is immediately validated. This provides instant feedback without waiting for form submission. It also adds input event listeners so that whenever the user starts typing again, any previous error or success styling is cleared, allowing the field to reset visually in real time. 

When the user submits the form, the script prevents the default submission using e.preventDefault() so the page does not reload. It then runs all three validation functions. If all fields are valid, the script simulates a successful submission: it shows a success toast message, resets the form using form.reset(), and clears all validation styles from the fields. If any field is invalid, it shows an error toast and automatically moves the cursor to the first field with an error using querySelector('.input-error'), helping the user quickly fix the issue. 

The third feature is the toast notification system, which provides temporary popup messages. The showToast() function first checks if a toast element already exists on the page (apex-toast). If not, it creates one dynamically and adds it to the document body. It then updates the message text and applies styling based on the type of message (success or error). The toast is shown by adding a show class, and a timer (setTimeout) automatically hides it after 4 seconds. If a new toast is triggered before the previous one disappears, the previous timer is cleared to prevent conflicts. 

Overall, this script significantly enhances the website by making navigation more intuitive, enforcing strong and user-friendly form validation, and improving feedback through modern notification messages. It ensures users are guided clearly through the form process while also keeping the interface interactive and responsive. Changes I made for part 3 Java 

I added images to home page, service, about, and testimonials. 

 

 IMAGE 1 AND 2

 

FOR HOME PAGES IMAGES 

 
IMAGE 3 AND 4
 

REFERENCE 

1. https://apexprotectionplan.com/company/ 

2. New images powered by Bing/ online search 

3. CSS styling (Ideas from Google such as finding colours, and navigation) 

4. Https://github.com/Elihlesphumelele/st10512875-part3/edit/main/README.md 

 

 

 
