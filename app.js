    //
    const x1 = document.querySelector("#x1");
    const y1 = document.querySelector("#y1");
    const x2 = document.querySelector("#x2");
    const y2 = document.querySelector("#y2");
    const btn = document.querySelector('#generate');
    btn.addEventListener('click', generateCo);
    generateCo();

    function generateCo(event){
        event.preventDefault();
        let items = document.querySelectorAll('tr');
        document.querySelector('table').innerHTML = `
        <tr class="heading-points">
            <th>Iter</th>
            <th>PK</th>
            <th>P<sub>k+1</sub></th>
            <th>XK</th>
            <th>YK</th>
            <th>X<sub>k+1</sub></th>
            <th>Y<sub>k+1</sub></th>
            </tr>
        `;

        if(items.length > 2){
            items.forEach(item => {
                item.remove();
                })
        }
        let valueX1 = parseInt(x1.value);
        let valueY1 = parseInt(y1.value);
        let valueX2 = parseInt(x2.value);
        let valueY2 = parseInt(y2.value);
        
        
        if(x1.value === '' && x2.value === '' && y1.value === '' && y2.value === ''){
//             console.log("empty");
        }else {
            
            let dx = valueX2 - valueX1;
            let dy = valueY2 - valueY1;
            
            let pk = 2*dy - dx;
            let data;
            let arr = [];
            arr.push([parseInt(x1.value), parseInt(y1.value)])

            let xCor = [], yCor = [];
            xCor.push(parseInt(x1.value));
            yCor.push(parseInt(y1.value));
            let counter = 1;
            while(valueX1 !== valueX2 && valueY1 !== valueY2 && counter <= 30){
                let tr = document.createElement('tr');
                if(pk < 0){
                    data = generatePklessthanZero(valueX1, valueY1, pk, dy);
                    pk = data.pk;
                    valueX1 = data.xk;
                    valueY1 = data.yk;
                    arr.push([valueX1, valueY1]);
                    xCor.push(valueX1);
                    yCor.push(valueY1);
                }else {
                    data = generatePkgreaterthanequalZero(valueX1, valueY1, pk, dy, dx);
                    pk = data.pk;
                    valueX1 = data.xk;
                    valueY1 = data.yk;
                    arr.push([valueX1, valueY1]);
                    xCor.push(valueX1);
                    yCor.push(valueY1);
                }
                tr.innerHTML = `
                    <td>${counter}</td>
                    <td>${data.prvsPk}</td>
                    <td>${data.pk}</td>
                    <td>${data.prvsXk}</td>
                    <td>${data.prvsYk}</td>
                    <td>${data.xk}</td>
                    <td>${data.yk}</td>
                `;
                document.querySelector("table").appendChild(tr);
                counter++;
            }
            // console.log(arr);
//             console.log(xCor);
//             console.log(yCor);

            var dataItems = [{
                x: xCor,
                y: yCor,
                mode:"lines"
              }];
              
              // Define Layout
              var layout = {
                xaxis: {
                     range: [5, 30],
                     title: "X- Axis"
                },
                yaxis: {
                    range: [5, 80],
                    title: "Y- Axis"
                },  
                title: "Bresenham Line Drawing Graph Plotting"
              };
              
              // Display using Plotly
              Plotly.newPlot("myPlot", dataItems, layout);
            document.querySelector('[data-title="Autoscale"]').click();
        }
    }
    
    function generatePklessthanZero(valueX1, valueY1, pk, dy){
        let xk_plus_1 = valueX1 + 1;
        let yk_plus_1 = valueY1;
        let pk_plus_1 = pk + 2*dy;

        return ({
            prvsXk : valueX1,
            prvsYk : valueY1,
            prvsPk : pk,
            xk : xk_plus_1, 
            yk : yk_plus_1,
            pk : pk_plus_1
        })
    }
    function generatePkgreaterthanequalZero(valueX1, valueY1, pk, dy, dx){
        let xk_plus_1 = valueX1 + 1;
        let yk_plus_1 = valueY1 + 1;
        let pk_plus_1 = pk + 2*dy - 2*dx;
        
        return ({
            prvsXk : valueX1,
            prvsYk : valueY1,
            prvsPk : pk,
            xk : xk_plus_1, 
            yk : yk_plus_1,
            pk : pk_plus_1
        })
    }
    document.querySelector('input[type="reset"').addEventListener('click', clearAll);

    function clearAll(e){
        e.preventDefault();
        x1.value = '';
        x2.value='';
        y1.value='';
        y2.value='';
        document.getElementById("myPlot").innerHTML = ''
        let items = document.querySelectorAll('tr');
        items.forEach(item => {
            if(!item.classList.contains('heading-points')){
                item.remove();
            }
        })
    }
