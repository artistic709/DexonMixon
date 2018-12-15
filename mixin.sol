pragma solidity ^0.4.24;

contract etherMixin {
    using SafeMath for uint256;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => Channel)) public channel;
    
    struct Channel{
        uint256 value;
        uint256 expire;
        bytes32 secretHash;
    }
    
    function open(address to, uint256 value, uint256 expire, bytes32 secretHash) public{
        require(channel[msg.sender][to].value == 0);
        balanceOf[msg.sender] = balanceOf[msg.sender].sub(value);
        channel[msg.sender][to].value = value;
        channel[msg.sender][to].expire = expire;
        channel[msg.sender][to].secretHash = secretHash;
    }

    function refund(address to) public{
        require(channel[msg.sender][to].expire < now);
        balanceOf[msg.sender] = balanceOf[msg.sender].add(channel[msg.sender][to].value);
        channel[msg.sender][to].value = 0;
        channel[msg.sender][to].expire = 0;
    }
    
    function claim(address from, bytes32 secret) public{
        require(channel[from][msg.sender].expire >= now);
        require(channel[from][msg.sender].secretHash == keccak256(abi.encodePacked(secret)));
        balanceOf[msg.sender] = balanceOf[msg.sender].add(channel[from][msg.sender].value);
        channel[from][msg.sender].value = 0;
        channel[from][msg.sender].expire = 0;
    }

    function deposit() public payable {
        address _from = msg.sender;
        balanceOf[_from] = balanceOf[_from].add(msg.value);
    }
    
    function withdraw(uint256 _value) public {
        address _to = msg.sender;
        balanceOf[_to] = balanceOf[_to].sub(_value);
        _to.transfer(_value);
    }

    function mix (address[] from, address[] to, uint256[] out, uint256[] _in, uint8[] v,bytes32[] r,bytes32[] s) public {
        
        uint256 totalOut;
        uint256 totalIn;
        
        require(from.length == out.length);
        require(to.length == _in.length);

        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 digest = keccak256(abi.encodePacked(from, to, out, _in,address(this)));
        bytes32 txHash = keccak256(abi.encodePacked(prefix,digest));

        for (uint256 i = 0; i < from.length; i++){
            require(ecrecover(txHash,v[i],r[i],s[i]) == from[i]);
        }
        for (i = 0; i < from.length; i++){
            address f = from[i];
            balanceOf[f] = balanceOf[f].sub(out[i]);
            totalOut = totalOut.add(out[i]);
        }
        for(i = 0; i < to.length; i++){
            address t = to[i];
            balanceOf[t] = balanceOf[t].add(_in[i]);
            totalIn = totalIn.add(_in[i]);
        }
        require(totalIn == totalOut);
    }
    
}


library SafeMath {

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        assert(c / a == b);
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}
