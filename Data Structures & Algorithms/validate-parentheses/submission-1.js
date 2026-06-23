class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isValid(s) {

   
     
        while(s.includes("()") || s.includes("{}") || s.includes("[]")){
          s = s.replace("()", "");
          s = s.replace("{}", "");
          s = s.replace("[]", "");
        } 

          
      
     
     return s.length === 0;
    }
}


 //we can map opening tag
      //we can use two pointer approach 
      //start from left and right , if match , go continuosly forward