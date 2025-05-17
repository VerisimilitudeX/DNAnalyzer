<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>DNA Analysis Report</title>
    <script src="https://cdn.plot.ly/plotly-2.27.0.min.js"></script>
    <style>
        body { font-family: Arial, sans-serif; margin: 2em; }
        #baseChart { width: 100%; height: 400px; }
        table { border-collapse: collapse; margin-top: 1em; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
    </style>
</head>
<body>
    <h1>DNA Analysis Report</h1>
    <p>Sequence length: ${sequenceLength}</p>
    <p>GC content: ${gcContent}%</p>

    <div id="baseChart"></div>

    <table>
        <thead>
            <tr><th>Base</th><th>Count</th></tr>
        </thead>
        <tbody>
            <#list baseData as item>
            <tr>
                <td>${item.base}</td>
                <td>${item.count}</td>
            </tr>
            </#list>
        </tbody>
    </table>

    <script>
        var data = [{
            x: [<#list bases as b>'${b}'<#if b_has_next>,</#if></#list>],
            y: [<#list counts as c>${c}<#if c_has_next>,</#if></#list>],
            type: 'bar'
        }];
        var layout = {
            title: 'Base Pair Composition'
        };
        Plotly.newPlot('baseChart', data, layout);
    </script>
</body>
</html>
