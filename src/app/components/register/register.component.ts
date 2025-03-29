import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm:FormGroup;
  isSubmitting=false;
  errorMessage='';

  constructor(private authService:AuthService,private fb:FormBuilder) {
    this.registrationForm=this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
   }

   onSubmit(){
    if(this.registrationForm.invalid) return

    this.isSubmitting=true;
    this.errorMessage='';

    this.authService.register(this.registrationForm.value).subscribe({
      next:(response)=>{
        console.log("Registration successful",response);
        alert("Registration successful")
        this.registrationForm.reset()
      },

      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = error.error?.message || 'Registration failed';
      },

      complete:()=>{
        this.isSubmitting=false;
      }
    })
   }

  ngOnInit(): void {
  }

}

