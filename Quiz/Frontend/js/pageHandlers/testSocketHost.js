let testSocket = new WebSocket("ws://localhost:8080/Backend_war_exploded/quiz_server?userId=1");

testSocket.onopen = function(e) {
    alert("[open] Connection established");
    alert("Sending to server");
    testSocket.send("{userRole: 'EDITOR', messageType: 'START', userName: 'HUSKO2'}");
};

testSocket.onmessage = function(event) {
    alert(`[message] Data received from server: ${event.data}`);
};