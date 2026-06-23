impl Solution {
    pub fn is_valid(s: String) -> bool {
       let mut s_str = s;

       while(s_str.contains("()") || s_str.contains("{}") || s_str.contains("[]")){
        s_str = s_str.replace("()", "");
        s_str = s_str.replace("{}", "");
        s_str = s_str.replace("[]", "");
       }

       s_str.len() == 0
    }
}
