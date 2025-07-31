import Payment from './payment.model.js';

// ---------- ALL ROLES ---------- //
export const createPayment = async (req, res) => {
    try {
        const logged = req.userJwt;
        const { bank, type, holder, cardNumber, dueDate, cvv } = req.body;

        const exists = await Payment.findOne({ cardNumber });
        if (exists) {
            return res.status(400).json({
                success: false,
                message: 'This card is already registered'
            });
        };

        const payment = await Payment.create({ student: logged._id, bank, type, holder, cardNumber, dueDate, cvv });

        return res.status(201).json({
            success: true,
            message: 'Card registered successfully',
            payment
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to register card',
            error: err.message
        });
    }
};

export const deletePayment = async (req, res) => {
    try {
        const logged = req.userJwt;
        const { pid } = req.params;

        const found = await Payment.findOne({ _id: pid, status: true });

        if (!found) {
            return res.status(404).json({
                success: false,
                message: 'Card not found'
            });
        }

        await Payment.findByIdAndDelete(pid);

        return res.status(200).json({
            success: true,
            message: 'Card deleted successfully'
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete card',
            error: err.message
        });
    }
};

// Students see their own cards information detail; Admins can search by student ID
export const findPayments = async (req, res) => {
    try {
        const logged = req.userJwt;
        const { limit = 10, from = 0 } = req.query;
        const query = { status: true };
        const { pid, user } = req.body;

       let filterParameter = { ...query };

        if (pid) filter._id = pid;
        if (logged.role === 'STUDENT') {
            filter.user = logged._id;
        }
        if (user) {
            filter.user = user;
        }

        let payment = await Payment.find(filterParameter).populate('user', 'name email').skip(Number(from)).limit(Number(limit));

        return res.status(200).json({
            success: true,
            message: "Cards found successfully",
            payment
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to find the cards you sought",
            error: err.message,
        });
    }
};
