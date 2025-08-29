import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './TeamHierarchy.css';

function TeamHierarchy() {
  const svgRef = useRef();

  useEffect(() => {
    fetch("http://localhost:8000/api/team-hierarchy/", {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        renderTree(data);
      })
      .catch((err) => {
        console.error("Error fetching team hierarchy:", err);
      });
  }, []);

  function renderTree(teamHierarchy) {
    const margin = { top: 80, right: 90, bottom: 50, left: 90 };
    const width = 1200 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const tooltip = d3.select('#tooltip');

    const root = d3.hierarchy(teamHierarchy, (d) => d.children);
    root.x0 = width / 2;
    root.y0 = 0;

    const treeLayout = d3.tree().size([width, height]);

    // Collapse all except the first level under CEO
    function collapseAllExceptFirstLevel(d) {
      if (d.children) {
        d.children.forEach(child => {
          if (d.depth >= 1) {
            child._children = child.children;
            child.children = null;
          }
          collapseAllExceptFirstLevel(child);
        });
      }
    }

    collapseAllExceptFirstLevel(root);
    update(root);

    function update(source) {
      treeLayout(root);
      const nodes = root.descendants();
      const links = root.links();

      const node = g.selectAll('g.node').data(nodes, (d) => d.data.name);

      const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', (d) => `translate(${source.x0},${source.y0})`)
        .on('click', (event, d) => {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
          update(d);
        });

      nodeEnter.append('circle')
        .attr('r', 25)
        .attr('fill', (d) => d.depth === 0 ? '#ffe066' : '#fff') // Highlight CEO
        .attr('stroke', '#666');

      nodeEnter.each(function (d) {
        const g = d3.select(this);
        const avatarURL =
          d.data.gender === 'Female'
            ? 'https://cdn-icons-png.flaticon.com/512/3135/3135789.png'
            : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

        g.append('image')
          .attr('href', avatarURL)
          .attr('x', -20)
          .attr('y', -20)
          .attr('width', 40)
          .attr('height', 40)
          .style('clip-path', 'circle(20px at 20px 20px)')
          .style('pointer-events', 'none');

        g.on('mouseover', (event) => {
          tooltip
            .style('display', 'block')
            .html(
              `<strong>${d.data.name}</strong><br/>${d.data.title}<br/>Gender: ${d.data.gender}`
            )
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 30}px`);
        })
          .on('mousemove', (event) => {
            tooltip.style('left', `${event.pageX + 10}px`).style('top', `${event.pageY - 30}px`);
          })
          .on('mouseout', () => {
            tooltip.style('display', 'none');
          });
      });

      nodeEnter
        .append('text')
        .attr('dy', -35)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('font-family', 'Segoe UI, sans-serif')
        .text((d) => d.data.name);

      nodeEnter
        .append('text')
        .attr('dy', 45)
        .attr('text-anchor', 'middle')
        .attr('fill', 'gray')
        .style('font-size', '12px')
        .style('font-family', 'Segoe UI, sans-serif')
        .text((d) => d.data.title);

      nodeEnter
        .merge(node)
        .transition()
        .duration(500)
        .attr('transform', (d) => `translate(${d.x},${d.y})`);

      node
        .exit()
        .transition()
        .duration(500)
        .attr('transform', (d) => `translate(${source.x},${source.y})`)
        .remove();

      const link = g.selectAll('path.link').data(links, (d) => d.target.data.name);

      const linkEnter = link
        .enter()
        .insert('path', 'g')
        .attr('class', 'link')
        .attr('fill', 'none')
        .attr('stroke', '#ccc')
        .attr('stroke-width', 2)
        .attr(
          'd',
          d3
            .linkVertical()
            .x(() => source.x0)
            .y(() => source.y0)
        );

      linkEnter
        .merge(link)
        .transition()
        .duration(500)
        .attr(
          'd',
          d3
            .linkVertical()
            .x((d) => d.x)
            .y((d) => d.y)
        );

      link.exit().transition().duration(500).remove();

      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }
  }

  return (
    <div className="tree-container">
      <h2 className="tree-heading">Team Hierarchy</h2>
      <svg ref={svgRef}></svg>
      <div id="tooltip"></div>
    </div>
  );
}

export default TeamHierarchy;

