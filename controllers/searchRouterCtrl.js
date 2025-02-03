const data = [

    {
        id: 1, name: "rahul", email: "rahulgore34@test.com"
    },
    {
        id: 2, name: "amit", email: "amit@test.com"
    },
    {
        id: 3, name: "mahesh", email: "mjoshi@test.com"
    },
    {
        id: 4, name: "chaka", email: "chaka@test.com"
    }
]

const router = require("express").Router();

router.get("/search", async (req, res) => {
    try {
        const result = data.filter(f=> f.name.includes(req.query.q))
        res.json({
            data: result
        })

    } catch (error) {
        res.json({
            success: false,
            message: error?.message
        })
    }
})


module.exports = router;