document.addEventListener('DOMContentLoaded', () => {
    const donateForm = document.getElementById('donateForm');
    const donationStatus = document.getElementById('donation-status');

    donateForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const accountId = document.getElementById('account-id').value;
        const amount = parseInt(document.getElementById('donation-amount').value);

        try {
            const response = await fetch('http://127.0.0.1:5000/transfer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    from_id: accountId,
                    to_id: 'fundraising_account', // Replace with campaign or central account
                    amount: amount
                })
            });

            const result = await response.json();

            if (response.ok) {
                donationStatus.textContent = `Thank you for your donation! ${amount} tokens were successfully transferred.`;
                donationStatus.style.color = 'green';
            } else {
                donationStatus.textContent = `Error: ${result.message || 'Unable to process donation'}`;
                donationStatus.style.color = 'red';
            }
        } catch (error) {
            donationStatus.textContent = 'Error connecting to the server.';
            donationStatus.style.color = 'red';
        }
    });
});
