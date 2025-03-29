import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup;
  isSubmitting=false;
  errorMessage='';

  constructor(private authService :AuthService,private fb:FormBuilder) {
    this.loginForm=this.fb.group({
     
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
   }

   onSubmit(){
    if(this.loginForm.invalid) return

    this.isSubmitting=true;
    this.errorMessage='';

    this.authService.login(this.loginForm.value).subscribe({
      next:(response)=>{
        console.log("Login successful",response);
        alert("Login successful")
        this.loginForm.reset()
      },

      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = error.error?.message || 'Login failed';
        this.isSubmitting=false;
        
      },

      complete:()=>{
        this.isSubmitting=false;
      }
    })
   }

  ngOnInit(): void {
  }

}
