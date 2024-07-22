import { fireEvent, render, screen } from '@testing-library/react';
import Form from '.';
import '@testing-library/jest-dom/extend-expect';


describe('Form Submition Test', () => {

    test('given a form, when filled correctly, should acknowledge the submission', async () => {
        render(
            <Form />
        )

        const name = screen.getByLabelText('Name');
        const email = screen.getByLabelText('Email');
        const password = screen.getByLabelText('Password');
        const confirmPassword = screen.getByLabelText('Confirm Password');
        const submit = screen.getByRole('button');

        fireEvent.change(name, {
            target: {
                value: 'Victor Silva'
            }
        })

        fireEvent.change(email, {
            target: {
                value: 'victor@email.com'
            }
        })

        fireEvent.change(password, {
            target: {
                value: 'Password123!'
            }
        })

        fireEvent.change(confirmPassword, {
            target: {
                value: 'Password123!'
            }
        })

        fireEvent.click(submit)

        const acknowledgment = await screen.findByText('Thanks for your submission.')
        expect(acknowledgment).toBeVisible()
    })

})