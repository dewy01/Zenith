using backend.Data;
using FluentValidation;
using System;

namespace backend.Dto.Validators
{
    public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
    {


        public RegisterUserDtoValidator(DataContext dbContext)
        {
            RuleFor(x => x.Email)
                .EmailAddress()
                .NotEmpty();
            RuleFor(x => x.Password)
                .NotEmpty()
                .MinimumLength(8);
            RuleFor(x => x.Password)
                .Equal(y => y.PasswordConfirm);
            RuleFor(x => x.Username)
                .Custom((value, context) =>
                {
                    var usernameInUse = dbContext.Users.Any(x => x.Username == value);
                    if(usernameInUse)
                    {
                        context.AddFailure("Username", "This username is already taken");
                    }
                });
            RuleFor(x => x.Email)
                .Custom((value, context) =>
                {
                    var emailInUse = dbContext.Users.Any(x => x.Email == value);
                    if (emailInUse)
                    {
                        context.AddFailure("Email", "This email is taken");
                    }
                });
        }

    }
}
