const get = (req, res) => {
    // handler code here
    console.log("hi");

};
  
const post = (req, res) => {
    // handler code here
    console.log("hi post");
    res.status(200).json('success');
    
};
  
export default { get,post };
  